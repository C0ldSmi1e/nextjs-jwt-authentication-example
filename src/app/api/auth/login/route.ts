import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "S3cret";

const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();

    // Parse ADMIN_USERS from environment variable with improved error handling
    let adminUsers;
    try {
      const adminUsersStr = process.env.ADMIN_USERS || "{}";
      // Remove any wrapping quotes or backticks if present
      const cleanedStr = adminUsersStr.replace(/^[`'"]+|[`'"]+$/g, "");
      adminUsers = JSON.parse(cleanedStr);
    } catch (error) {
      console.error("Failed to parse ADMIN_USERS:", error);
      console.error("Raw ADMIN_USERS value:", process.env.ADMIN_USERS);
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Check if user exists and password matches
    if (!adminUsers[username] || adminUsers[username] !== password) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Convert secret to TextEncoder for jose
    const secretKey = new TextEncoder().encode(JWT_SECRET);

    // Create a JWT token using jose
    const token = await new SignJWT({ username, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("30d") // 30 days expiration
      .sign(secretKey);

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set the cookie with 30-day expiration using NextResponse
    response.cookies.set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      path: "/",
    });

    revalidatePath("/admin");
    revalidatePath("/admin/login");
    revalidatePath("/api/auth/login");
    revalidatePath("/api/auth/logout");

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
};

export { POST };
