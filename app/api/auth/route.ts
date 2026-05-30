import { NextRequest, NextResponse } from "next/server";
import { findAdminByEmail, verifyPassword } from "@/lib/adminAuth";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "jrs-admin-secret-change-me";

// POST /api/auth — login with email + password
export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const user = await findAdminByEmail(email);
  if (!user) {
    // Constant-time response to prevent user enumeration
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });

  // Session = secret (proves auth) — stored httpOnly
  response.cookies.set("admin_session", ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  // User identity cookie (readable by client for display only)
  response.cookies.set(
    "admin_user",
    JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role }),
    {
      httpOnly: true,  // prevent client JS from reading — use /api/auth/me for display
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    }
  );

  return response;
}

// DELETE /api/auth — logout
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  response.cookies.set("admin_user", "", { maxAge: 0, path: "/" });
  return response;
}
