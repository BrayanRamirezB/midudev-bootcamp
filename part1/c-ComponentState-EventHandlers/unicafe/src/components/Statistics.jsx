import PropTypes from 'prop-types'
import StatisticLine from './StatisticLine'
import './Statistics.css'

const Statistics = ({ commentary }) => {
  const average = (commentary.good - commentary.bad) / commentary.total
  const positive = commentary.good / commentary.total

  return (
    <div className="container">
      <table>
        <thead></thead>
        <tbody>
          <StatisticLine text={'Good'} value={commentary.good} />
          <StatisticLine text={'Neutral'} value={commentary.neutral} />
          <StatisticLine text={'Bad'} value={commentary.bad} />
          <StatisticLine text={'All'} value={commentary.total} />
          <StatisticLine text={'Average'} value={average} />
          <StatisticLine text={'Positive'} value={positive} />
        </tbody>
      </table>
    </div>
  )
}

Statistics.propTypes = {
  commentary: PropTypes.object,
}

export default Statistics
