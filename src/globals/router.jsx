import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import Navigation from './navigation';
import Camera from '../pages/camera';
import Clipboard from '../pages/clipboard';
import Visualization from '../pages/visualization';

// optional: PWA, UT, SB, Linting & Prettier
export default function AppRouter() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Redirect to="/visualization" />
        </Route>
        <Route path="*">
          <OtherApp />
        </Route>
      </Switch>
    </Router>
  )
}

function OtherApp() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route path="/visualization" children={<Visualization />} />
      <Route path="/clipboard" children={<Clipboard />} />
      <Route path="/camera" children={<Camera />} />
    </Switch>
  )
}

function AppVisualization() {
  return <div>App Visualization</div>
}

function AppClipboard() {
  return <div>App Clipboard</div>
}