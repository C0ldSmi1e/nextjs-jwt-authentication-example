import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const POST = async () => {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the auth token cookie
    response.cookies.set({
      name: "auth-token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });

    revalidatePath("/admin");
    revalidatePath("/admin/login");
    revalidatePath("/api/auth/login");
    revalidatePath("/api/auth/logout");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    );
  }
};

export { POST };
