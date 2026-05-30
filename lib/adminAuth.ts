import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { promises as fs } from "fs";
import path from "path";

const scryptAsync = promisify(scrypt);
const ADMINS_PATH = path.join(process.cwd(), "data", "admins.json");

export type AdminRole = "super_admin" | "admin";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  passwordHash: string;
  createdAt: string;
};

// ── Password hashing ──────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const [salt, storedKey] = hash.split(":");
  const key = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(Buffer.from(storedKey, "hex"), key);
}

// ── Admin store ───────────────────────────────────────────
export async function readAdmins(): Promise<AdminUser[]> {
  try {
    const raw = await fs.readFile(ADMINS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeAdmins(users: AdminUser[]): Promise<void> {
  await fs.mkdir(path.dirname(ADMINS_PATH), { recursive: true });
  await fs.writeFile(ADMINS_PATH, JSON.stringify(users, null, 2), "utf-8");
}

export async function findAdminByEmail(
  email: string
): Promise<AdminUser | undefined> {
  const admins = await readAdmins();
  return admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}

export async function createAdmin(opts: {
  email: string;
  name: string;
  password: string;
  role?: AdminRole;
}): Promise<AdminUser> {
  const admins = await readAdmins();
  const { randomBytes: rb } = await import("crypto");
  const user: AdminUser = {
    id: rb(16).toString("hex"),
    email: opts.email.toLowerCase(),
    name: opts.name,
    role: opts.role ?? "admin",
    passwordHash: await hashPassword(opts.password),
    createdAt: new Date().toISOString(),
  };
  await writeAdmins([...admins, user]);
  return user;
}

export async function deleteAdmin(id: string): Promise<void> {
  const admins = await readAdmins();
  await writeAdmins(admins.filter((a) => a.id !== id));
}

export async function updateAdminPassword(
  id: string,
  newPassword: string
): Promise<void> {
  const admins = await readAdmins();
  const idx = admins.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error("Admin not found");
  admins[idx].passwordHash = await hashPassword(newPassword);
  await writeAdmins(admins);
}
