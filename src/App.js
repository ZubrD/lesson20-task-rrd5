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
      <h1>App Layout</h1>
      <BrowserRouter>
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
  console.log(data);
  return <h1>Main</h1>;
}

function UsersLayout() {
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>Users Layout</h1>
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
      <p>userId: {userId}</p>
    </div>
  );
}

function EditUserPage() {
  return <h1>Edit User Page</h1>;
}

export default App;
