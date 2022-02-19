import React, { Component } from 'react'

class FooterComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <footer className="footer">
          <div className="text-muted text-center">All Rights Reserved 2022 @Guilherme Martins</div>
        </footer>
      </div>
    )
  }
}

export default FooterComponent