import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import _ from 'lodash'

/**
 * Generates a MenuBar Paginator for displaying as part of other components
 * @author Brennick Langston
 * @version 0.0.1
 * NOTE
 * 1. requires a full set of pagination props
 *    - total_pages
 *    - current_page
 *    - next_page
 * 2. requires a callback function for loading more pages
 *    - loadMore (etc.)
 * 3. optional props
 *    - size: the size of the menu items to display
 * 4. Must set state variable 'hasMore' to false as it's initial state
 * 5. Must implement the 'loadMore' callback or the main component
 *    will not display at all.
 * 6. Must set 'hasMore' to true after loading the initial set of items.
 *    This is done in 'componentDidMount' after dispatching to the DB
 *    for the first time.
 * 7. example method for 'loadMore':
 *     loadMore = ( page ) => {
 *       const { pagination, dispatch } = this.props
 *       const { hasMore, query } = this.state
 *       if( hasMore && pagination.total_pages ) {
 *         if( page <= pagination.total_pages ) {
 *           dispatch(queryStudents(query,page))
 *         } else {
 *           this.setState({ hasMore: false })
 *         }
 *       }
 *     }
 */
class Paginator extends Component {
  state = { activeItem: '' }

  /**
   * Initializes the page/Menu.Item that will be displayed as active
   */
  componentDidMount = () => this.loadPagination(this.props)

  componentWillReceiveProps = ( nextProps ) => this.loadPagination(nextProps)

  // TODO: Add this change to main git file
  loadPagination = ( props ) => {
    const { pagination } = props
    if( pagination && pagination.current_page ) {
      this.setState({ activeItem: pagination.current_page })
    }
  }

  /**
   * Generates the actual Menu.Items in proper display order
   */
  generatePages = () => {
    const { activeItem } = this.state
    if( typeof activeItem === 'number' ) {
      const pageNums = this.calculatePages()
      let right = null
      let components = []
      if( pageNums.length > 0 ){
        // place the left menu chevron
        components.push(this.leftChevron(pageNums.shift()))
      } else {
        // Set all defaults to first page
        components.push(this.leftChevron(1))
      }
      if( pageNums.length > 0 ) {
        // store the right menu chevron
        right = this.rightChevron(pageNums.pop())
      } else {
         // Set all defaults to first page
        right = this.rightChevron(0)
      }
      // insert the middle paginator menu items
      pageNums.forEach( pageNum => {
        components.push(
          <Menu.Item
            key={pageNum+'M'}
            name={pageNum}
            active={activeItem === pageNum}
            onClick={this.loadPage} />
        )
      })
      // set the right chevron as the last available page
      components.push(right)
      // return the components for displaying
      return components
    }
  }

  /**
   * Generates the left-hand most Menu.Item as a Chevron Icon
   */
  leftChevron = ( pageNum ) => {
    const { activeItem } = this.state
    return (
      <Menu.Item
        key={pageNum+'L'}
        icon
        name={pageNum}
        active={activeItem === pageNum}
        onClick={this.loadPage} >
        <Icon name='left chevron' />
      </Menu.Item>
    )
  }

  /**
   * Generates the right-hand most Menu.Item as a Chevron Icon
   */
  rightChevron = ( pageNum ) => {
    const { activeItem } = this.state
    if( !pageNum || pageNum <= 0 )
      pageNum = '1' // if no more pages, then show the first page (default)
    return (
      <Menu.Item
        key={pageNum+'R'}
        icon
        name={pageNum}
        active={activeItem === pageNum}
        onClick={this.loadPage} >
        <Icon name='right chevron' />
      </Menu.Item>
    )
  }

  /**
   * Determine which pages will be placed in the paginator menu as items
   */
  calculatePages = () => {
    const { pagination: {current_page, total_pages} } = this.props
    // For mutating purposes in paginated menu
    const cp = parseInt(current_page,10)
    const tp = parseInt(total_pages,10)
    // set the page number range to display
    let pages = this.positions(cp,tp).map( pageNum => pageNum.toString())
    return pages
  }

  /**
   * Modified Algorithm from:
   * GitHubGist: https://gist.github.com/keon/5380f81393ad98ec19e6.js
   */
  positions = (current, total) => {
  	const pageLimit = 5;
  	let upperLimit, lowerLimit;
  	lowerLimit = upperLimit = Math.min(current, total);

  	for (let b = 1; b < pageLimit && b < total;) {
  	    if (lowerLimit > 1 ) {
  	        lowerLimit--; b++;
  	    }
  	    if (b < pageLimit && upperLimit < total) {
  	        upperLimit++; b++;
  	    }
  	}

    return _.range(lowerLimit,upperLimit+1,1)
  }

  /**
   * Helper for loading More pages
   * @param {Object} e - event object
   * @param {Object} data - event data object
   */
  loadPage = ( e, data ) => {
    this.setState({
      activeItem: data.name
    }, () => this.props.loadMore( data.name ))
  }

  /**
   * Renders the generated pagination menu
   */
  render() {
    const { size } = this.props
    return (
      <Menu
        pagination
        size={ size ? size : 'tiny'}
        floated='right'>
        { this.generatePages() }
      </Menu>
    )
  }
}

export default Paginator
