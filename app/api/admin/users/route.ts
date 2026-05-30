import { NextRequest, NextResponse } from "next/server";
import {
  readAdmins,
  createAdmin,
  deleteAdmin,
  updateAdminPassword,
  findAdminByEmail,
  type AdminRole,
} from "@/lib/adminAuth";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function getCallerRole(req: NextRequest): AdminRole | null {
  const userCookie = req.cookies.get("admin_user")?.value;
  if (!userCookie) return null;
  try {
    const user = JSON.parse(userCookie);
    return user.role ?? null;
  } catch {
    return null;
  }
}

// GET /api/admin/users — list all admins (super_admin only)
export async function GET(req: NextRequest) {
  if (getCallerRole(req) !== "super_admin") return unauthorized();
  const admins = await readAdmins();
  // Never expose password hashes
  return NextResponse.json(
    admins.map(({ passwordHash: _, ...u }) => u)
  );
}

// POST /api/admin/users — create a new admin (super_admin only)
export async function POST(req: NextRequest) {
  if (getCallerRole(req) !== "super_admin") return unauthorized();

  const { email, name, password, role } = await req.json();

  if (!email || !name || !password) {
    return NextResponse.json({ error: "email, name, password required" }, { status: 400 });
  }

  const existing = await findAdminByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const user = await createAdmin({ email, name, password, role });
  const { passwordHash: _, ...safe } = user;
  return NextResponse.json(safe, { status: 201 });
}

// PATCH /api/admin/users — update own password, or super_admin resets others
export async function PATCH(req: NextRequest) {
  const callerRole = getCallerRole(req);
  if (!callerRole) return unauthorized();

  const { id, newPassword } = await req.json();
  if (!id || !newPassword) {
    return NextResponse.json({ error: "id and newPassword required" }, { status: 400 });
  }

  const callerCookie = req.cookies.get("admin_user")?.value;
  const caller = callerCookie ? JSON.parse(callerCookie) : null;

  // Admins can only change their own password; super_admin can change anyone's
  if (callerRole !== "super_admin" && caller?.id !== id) return unauthorized();

  await updateAdminPassword(id, newPassword);
  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/users?id=xxx — remove admin (super_admin only)
export async function DELETE(req: NextRequest) {
  if (getCallerRole(req) !== "super_admin") return unauthorized();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  // Prevent deleting yourself
  const callerCookie = req.cookies.get("admin_user")?.value;
  const caller = callerCookie ? JSON.parse(callerCookie) : null;
  if (caller?.id === id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  await deleteAdmin(id);
  return NextResponse.json({ ok: true });
}
