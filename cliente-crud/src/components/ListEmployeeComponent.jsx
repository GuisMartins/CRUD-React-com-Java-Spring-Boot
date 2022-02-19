import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employees: []
    }
    this.addEmployee = this.addEmployee.bind(this)
    this.editEmployee = this.editEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({
        employees: this.state.employees.filter(employee => employee.id !== id)
      })
    })
  }
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`)
  }
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`)
  }

  componentDidMount() {
    EmployeeService.getEmployees().then(res => {
      this.setState({ employees: res.data })
    })
  }

  addEmployee() {
    this.props.history.push('/add-employee/_add')
  }

  render() {
    return (
      <div className='container w-75 mt-5'>
        <h2 className="text-center">Lista de funcionarios</h2>
        <div className="row">
          <button className="btn btn-primary my-1" onClick={this.addEmployee}>
            Adicionar funcionario
          </button>
        </div>

        <div className="row mt-2">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th className='text-center'> Primeiro nome </th>
                <th className='text-center'> Sobrenome nome</th>
                <th className='text-center'> Email</th>
                <th className='text-center'> Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map(employee => (
                <tr key={employee.id}>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName}</td>
                  <td> {employee.emailId}</td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info m-1"
                    >
                      Alterar{' '}
                    </button>
                    <button
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger m-1"
                    >
                      Deletar{' '}
                    </button>
                    <button
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info m-1"
                    >
                      Visualizar{' '}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ListEmployeeComponent
