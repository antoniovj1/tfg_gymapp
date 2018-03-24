import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0'
  },
  propToggleHeader: {
    margin: '20px auto 10px'
  }
};

export default class Exercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      stripedRows: true,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled
    });
  };

  handleChange = event => {
    this.setState({ height: event.target.value });
  };

  render() {
    const { exercise } = this.props;
    const { movement, sets } = exercise;

    if (sets) {
      return (
        <div className="row text-center" key={movement._id} style={{ marginBottom: `${3}em` }}>
          <div>
            <Table
              height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
            >
              <TableHeader
                displaySelectAll={this.state.showCheckboxes}
                adjustForCheckbox={this.state.showCheckboxes}
                enableSelectAll={this.state.enableSelectAll}
              >
                <TableRow>
                  <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{ textAlign: 'center' }}>
                    <h4>
                      {' '}
                      <strong> {movement.name} </strong>{' '}
                    </h4>
                  </TableHeaderColumn>
                </TableRow>

                <TableRow>
                  <TableHeaderColumn tooltip="Set number">#</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Number of repetitions">Reps</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Peso">Peso</TableHeaderColumn>
                  <TableHeaderColumn tooltip="Descanso">Rest</TableHeaderColumn>
                </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={this.state.deselectOnClickaway}
                showRowHover={this.state.showRowHover}
                stripedRows={this.state.stripedRows}
              >
                {sets.map((set, index) => (
                  <TableRow key={index}>
                    <TableRowColumn>{index + 1}</TableRowColumn>
                    <TableRowColumn>{set.repetitions}</TableRowColumn>
                    <TableRowColumn>{set.weight}</TableRowColumn>
                    <TableRowColumn>{set.rest}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      );
    }
    return null;
  }
}
