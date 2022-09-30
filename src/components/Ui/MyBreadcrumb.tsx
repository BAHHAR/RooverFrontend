import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

interface props {
  link?: { link: string; title: string };
}
function MyBreadcrumb({ link }: props) {
  return (
    <div className="mb-3">
      <Breadcrumb>
        <Breadcrumb.Item>
          <NavLink to="/" exact activeClassName="active__bread">
            <span>Statistiques</span>
          </NavLink>
        </Breadcrumb.Item>
        {link && (
          <Breadcrumb.Item>
            <NavLink to={link.link} exact activeClassName="active__bread">
              <span>{link.title}</span>
            </NavLink>
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
}

export default MyBreadcrumb;
