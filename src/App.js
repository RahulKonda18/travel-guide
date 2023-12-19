import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './App.css'

class App extends Component {
  state = {isLoading: true, results: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(`https://apis.ccbp.in/tg/packages`)
    const data = await response.json()
    console.log(data)
    const finalResults = data.packages.map(each => ({
      id: each.id,
      imageUrl: each.image_url,
      description: each.description,
      name: each.name,
    }))
    console.log(finalResults)
    this.setState({results: finalResults, isLoading: false})
  }

  render() {
    const {isLoading, results} = this.state
    return (
      <div className="bg">
        <h1 className="heading">Travel Guide</h1>
        <ul className="list">
          {isLoading ? (
            <div data-testid="loader" className="spinners">
              <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
            </div>
          ) : (
            results.map(each => (
              <li className="items" key={each.id}>
                <img src={each.imageUrl} alt={each.name} className="image" />
                <div className="text">
                  <h2 className="heading2">{each.name}</h2>
                  <p className="p">{each.description}</p>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default App
