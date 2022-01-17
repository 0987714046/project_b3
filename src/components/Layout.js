import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
const Layout = (props) => {
    // let location = useLocation();
    // const authToken = localStorage.getItem('token')
    // const history = useHistory();

    // const isUnRestrictedRoute = (pathname) => {
    //     return (
    //         pathname === "/signin"
    //     )
    // };

    // useEffect(() => {
    //     if (!authToken && !isUnRestrictedRoute(location.pathname)) {
    //         history.push('/').then(r => r);
    //     } else if (authToken && isUnRestrictedRoute(location.pathname)) {
    //         history.push('/login').then(r => r);
    //     }
    // }, [authToken, location.pathname]);
    let location = useLocation();
    if(location.pathname === '/' || location.pathname === '/reset-password') return (<></>) 
    return (
        <div className="sidebar" data-color="orange">
            <div className="logo">
                <a href="http://www.creative-tim.com" className="simple-text logo-mini">
                    CT
                </a>
                <a href="http://www.creative-tim.com" className="simple-text logo-normal">
                    Creative Tim
                </a>
            </div>
            <div className="sidebar-wrapper" id="sidebar-wrapper">
                <ul className="nav">
                    <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <a href="/dashboard">
                            <i className="now-ui-icons design_app" />
                            <p>Quản lí bộ phận</p>
                        </a>
                    </li>
                    <li className={location.pathname === '/employee' ? 'active' : ''}>
                        <a href="/employee">
                            <i className="now-ui-icons education_atom" />
                            <p>Quản lí nhân sự</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default Layout;