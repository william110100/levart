import React from 'react';
import CheckpointTable from '../components/checkpoint/CheckpointTable';
import ContainerHeader from '../../../../components/ContainerHeader';

function Checkpoint(props) {
  const { match } = props;

  return (
    <div className="animated slideInUpTiny animation-duration-3">
      <ContainerHeader match={match} title="Terminal" />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card p-0">
            <div className="p-4">
              <CheckpointTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkpoint;
