import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-900 text-white text-center text-sm">
      <p>&copy; {new Date().getFullYear()} ColumnFive Media. All rights reserved.</p>
    </footer>
  );
}