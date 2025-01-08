import React from 'react';
import ContainerHeader from '../../../../components/ContainerHeader';
import AnnouncementTable from '../components/AnnouncementTable';

class Announcement extends React.Component {
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  render(ctx) {
    const { match } = this.props;
    return (
      <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader match={match} title="Announcement List" />
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card p-0">
              <div className="p-4">
                <AnnouncementTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Announcement;
