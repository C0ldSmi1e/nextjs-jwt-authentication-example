"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Call logout API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to login page
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="cursor-pointer rounded-md hover:underline"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;