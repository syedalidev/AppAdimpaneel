export default function Footer (){

    return(
        <>
        <footer className="footer">
          <div className="footer-container">
        <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
        </footer>
        </>
    )
}