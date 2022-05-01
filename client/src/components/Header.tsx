import React from "react";

function Header({ title }: { title: string }) {
  return (
    <div className="Header">
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
