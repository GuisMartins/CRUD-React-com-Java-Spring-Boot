import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      id: this.props.match.params.id,
      firstName: '',
      lastName: '',
      emailId: ''
    }
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  // step 3
  componentDidMount() {

    // step 4
    if (this.state.id === '_add') {
      return
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId
        });
      });
    }
  }
  saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let employee = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
    console.log('employee => ' + JSON.stringify(employee));

    // step 5
    if (this.state.id === '_add') {
      EmployeeService.createEmployee(employee).then(res => {
        this.props.history.push('/employees');
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id).then(res => {
        this.props.history.push('/employees');
      });
    }
  }

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  }

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  }

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  }

  cancel() {
    this.props.history.push('/employees');
  }

  getTitle() {
    if (this.state.id === '_add') {
      return <h3 className="text-center">Adicionar funcionario</h3>
    } else {
      return <h3 className="text-center">Editar fincionario</h3>
    }
  }
  render() {
    return (
      <div>

        <div className="container mt-3">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {
                this.getTitle()
              }
              <div className="card-body">
                <form>
                  <div className="form-group mb-3">
                    <label> Primerio nome: </label>
                    <input placeholder="Primerio nome" name="firstName" className="form-control"
                      value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                  </div>
                  <div className="form-group mb-3">
                    <label> Sobrenome: </label>
                    <input placeholder="Sobrenome" name="lastName" className="form-control"
                      value={this.state.lastName} onChange={this.changeLastNameHandler} />
                  </div>
                  <div className="form-group mb-3">
                    <label> Email: </label>
                    <input placeholder="Endereço de e-mail" name="emailId" className="form-control"
                      value={this.state.emailId} onChange={this.changeEmailHandler} />
                  </div>
                  <div className=' '>
                    <button className="btn btn-success me-2" onClick={this.saveOrUpdateEmployee}>Salvar</button>
                    <button className="btn btn-danger " onClick={this.cancel.bind(this)} >Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default CreateEmployeeComponent