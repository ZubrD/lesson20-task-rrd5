import {
  BrowserRouter,
  NavLink,
  Link,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>App Layout</h1>
        <NavLink to={"/users"}>Users List Page</NavLink>
        <Switch>
          <Route path="/users" component={UsersLayout} />
          <Route path="/" component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function MainPage() {
  const data = useRouteMatch();
  return <h1>Main</h1>;
}

function UsersLayout() {
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>Users Layout</h1>
      <NavLink to={"/"}>Main</NavLink>
      <Switch>
        <Route path={path + "/:userId/profile"} component={UserProfilePage} />
        <Route path={path + "/:userId/edit"} component={EditUserPage} />
        <Route path={path} exact component={UserListPage} />
        <Redirect from={path + "/:userId"} to={path + "/:userId/profile"} />
      </Switch>
    </div>
  );
}

function UserListPage() {
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>User List Page</h1>
      <ul>
        {new Array(5).fill("").map((_, index) => (
          <li key={"user_list_component_" + index}>
            <Link to={`${path}/${index}`}>User {index}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfilePage() {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Page</h1>
      <ul>
        <li>
          <NavLink to="/users">User List Page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit this User</NavLink>
        </li>
      </ul>

      <p>userId: {userId}</p>
    </div>
  );
}

function EditUserPage() {
  const { userId } = useParams();
  return (
    <div>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <NavLink to={"/users/" + userId}>User Profile Page</NavLink>
        </li>
        <li>
          <NavLink to={"/users/" + (+userId + 1)}>Another User</NavLink>
        </li>
        <li>
          <NavLink to={"/users"}>Users List Page</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default App;
