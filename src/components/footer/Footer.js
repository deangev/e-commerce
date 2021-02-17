import React from "react";
import "./footer.css";

export default function Footer() {
  const curDate = new Date();
  const year = curDate.getFullYear();

  return (
    <div className="footer border-top d-flex align-items-center justify-content-center">
      <p>
        <a id="copyright" target="_blank" href="https://creativecommons.org/licenses/by/4.0/">
          Copyright&nbsp;
        </a>
        © {year}, Dean Geva. All Rights Reserved.
      </p>
    </div>
  );
}
