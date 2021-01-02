import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'

const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  // console.log(repos)

  // params: total and exact iteration callback function and return an object
  let languages = repos.reduce(
    (total, item) => {
      // console.log(item)
      // console.log(total)
      const { language } = item
      // if language is null return
      if (!language) return total
      // if the property does not exist create it and set it's value to 1
      if (!total[language]) {
        total[language] = { label: language, value: 1 }
      } else {
        // otherwise make a copy of the object and set the value property to its previous value + 1
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
        }
      }
      // return the total, which is an object made up of each item
      return total
    },
    // return an object
    {}
  )
  // console.log(languages)
  // returns an array of the languages object with its properties values, then sort and slice
  languages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)
  // console.log(languages)

  const chartData = [
    {
      label: 'poop',
      value: '290',
    },
    {
      label: 'Saudi',
      value: '260',
    },
    {
      label: 'Canada',
      value: '180',
    },
  ]
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={languages} />
        <div></div>
        <Doughnut2D data={chartData} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
