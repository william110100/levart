import React from 'react';
import CKEditor from 'react-ckeditor-component';
import Button from '@material-ui/core/Button';
import ContainerHeader from '../../../../components/ContainerHeader';
import {getStatic, updateStatic} from '../../../../actions/Static';

const staticID = 2;
const staticType = 2;

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null
    };
  }

  onChange(evt) {
    const newContent = evt.editor.getData();
    this.setState({
      content: newContent
    });
  }

  componentDidMount = async () => {
    const data = await getStatic(staticID);
    this.setState({content: data.content});
  }

  saveStatic = async () => {
    const {content} = this.state;
    const payload = {
      content, type: staticType
    };
    await updateStatic(staticID, payload);
  }

  render(ctx) {
    const { match } = this.props;
    const { content } = this.state;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={match} title="Privacy Policy" />
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card p-0">
              <div className="jr-card">
                <CKEditor
                  scriptUrl="/vendors/ckeditor/ckeditor.js"
                  activeClass="p10"
                  content={content}
                  events={{
                    change: this.onChange.bind(this)
                  }}
                  />
                <div className="mt-2">
                  <div className="jr-btn-group">
                    <Button variant="contained" color="primary" onClick={this.saveStatic} className="jr-btn text-white">
                      <span>Save</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;
