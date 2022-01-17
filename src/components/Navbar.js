import { Menu, Dropdown } from 'antd';

const Navbar = (props) => {
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="/">Log out</a>
            </Menu.Item>
        </Menu>
    );
    return (
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-toggle">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>
                    <a className="navbar-brand" href="#pablo">{props.title}</a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab" />
                    <span className="navbar-toggler-bar navbar-kebab" />
                    <span className="navbar-toggler-bar navbar-kebab" />
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navigation">
                    <ul className="navbar-nav">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <li className="nav-item">
                                <a className="nav-link" href="#pablo">
                                    <i className="now-ui-icons users_single-02" />
                                    <p>
                                        <span className="d-lg-none d-md-block">Account</span>
                                    </p>
                                </a>
                            </li>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;