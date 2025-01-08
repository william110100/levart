import React, {Component} from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import CircularProgress from '../components/CircularProgress/index';

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    componentDidMount() {
      nprogress.start();
      this.mounted = true;
      if (this.mounted) {
        nprogress.done();
        importComponent()
          .then(({default: Component}) => {
            this.setState({
              component: <Component {...this.props} />
            });
          });
      }
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render(ctx) {
      const Progress = (
        <div
          className="loader-view"
          style={{height: 'calc(100vh - 200px)'}}>
          <CircularProgress />
        </div>
      );
      const {component: Component} = this.state;
      return (Component || Progress);
    }
  }

  return AsyncFunc;
}
