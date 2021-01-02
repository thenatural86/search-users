import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'

const Repos = () => {
  const { repos } = React.useContext(GithubContext)

  // params: total and exact iteration callback function and return an object
  const languages = repos.reduce(
    (total, item) => {
      const { language, stargazers_count } = item
      // if language is null return
      if (!language) return total
      // if the property does not exist create it and set it's value to 1
      if (!total[language]) {
        total[language] = { label: language, value: 1, stars: stargazers_count }
      } else {
        // otherwise make a copy of the object and set the value property to its previous value + 1
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
          stars: total[language].stars + stargazers_count,
        }
      }
      // return the total, which is an object made up of each item
      return total
    },
    // return an object
    {}
  )
  // returns an array of the languages object with its properties values, then sort and slice
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  // most stars per lang
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  // stars and forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, forks, name } = item
      // dynamically create the stargazers_count property on the stars object, which is a int. In that stargazers_count property on the stars obj, give it a label property with a value of name and a value property with a value of stargazers_count, which is a int.
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    // return an object that has two properties, stars and forks, which are objects themselves
    { stars: {}, forks: {} }
  )
  console.log(stars)
  // turn into an array instead of obj. Get the last 5 which are the 5 biggest and then reverse so the biggest is displayed first
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
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
