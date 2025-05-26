import { NavLink } from "react-router-dom"
export const Error = () => {
    return (
        <>
            <section className="error-content">
                <div className=" container content">
                    <div className="top">
                        <h1 className="header">404</h1>
                        <h2>Page Not Found</h2>
                        <p>We're sorry, but the page you are looking for doesn't exist.</p>
                        <p>It might have been removed, had its name changed, or is temporarily unavailable.</p>
                    </div>
                    <div className="bottom">
                        <p>What can you do?</p>
                        <ul>
                            <li>Check the URL for any typos or errors.</li>
                            <li>Return to the <NavLink to="/">homepage</NavLink>.</li>
                            <li>Use the navigation bar at the top of the page to find what you're looking for.</li>
                            <li>Contact our support team if you need further assistance.</li>
                        </ul>
                        <p>Thank you for your understanding.</p>
                    </div>
                </div>
            </section>

        </>
    )
}