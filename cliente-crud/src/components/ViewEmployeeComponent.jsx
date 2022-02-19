import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      employee: {}
    }
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then(res => {
      this.setState({ employee: res.data });
    })
  }

  render() {
    return (
      <div className='mt-3'>

        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center my-1">Detalhes do Funcionario </h2>
          <div className="card-body">
            <div className="row mb-2">
              <label className='fw-bold'>Primeiro nome: </label>
              <div> {this.state.employee.firstName}</div>
            </div>
            <div className="row mb-2">
              <label className='fw-bold'> Sobrenome: </label>
              <div> {this.state.employee.lastName}</div>
            </div>
            <div className="row">
              <label className='fw-bold'> Email: </label>
              <div> {this.state.employee.emailId}</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default ViewEmployeeComponent