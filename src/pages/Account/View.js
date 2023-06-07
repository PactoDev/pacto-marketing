import web3 from 'web3';

import AntDTable from '../../components/organisms/AntDTable';
import Heading from '../../components/atoms/Heading';

const AccountView = () => {
  return (
    <div>

      <Heading level={3}>
        Transaction List
      </Heading>
      <AntDTable
        cellRenderers={[
          {
            title: 'One',
            dataIndex: 'cellOne',
            key: 'cellOne',
            width: 75,
            render: (p) => <div>{p}</div>,
          },
          {
            title: 'Two',
            dataIndex: 'cellTwo',
            key: 'cellTwo',
            width: 75,
            render: (p) => <div>{p}</div>,
          },
        ]}
        data={[
          {
            cellOne: 'dataOne',
            cellTwo: 'dataTwo',
          },
          {
            cellOne: 'dataOne',
            cellTwo: 'dataTwo',
          },
          {
            cellOne: 'dataOne',
            cellTwo: 'dataTwo',
          },
        ]}
      />
    </div>
  );
};

AccountView.propTypes = {};

export default AccountView;
