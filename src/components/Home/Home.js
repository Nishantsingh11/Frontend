import React, { useState } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from "@material-ui/core"
import useStyle from "./styles.js"
import { useHistory, useLocation } from 'react-router-dom'
import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import { useDispatch } from 'react-redux'
import {  getPostBySearch } from "../../actions/posts.js"
import Pagination from '../Pageination'
import ChipInput from 'material-ui-chip-input'



function useQuery() {
  return new URLSearchParams(useLocation().search)
}


const Home = () => {
  const classes = useStyle();
  const [currentId, setCurrentId] = useState(0)
  const query = useQuery()
  const history = useHistory()
  const page = query.get("page") || 1
  const searchQuery = query.get('searchQuery')
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);




  const dispatch = useDispatch();

  const searchPost = () => {
    if (search.trim()||tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }
    else {
      history.push('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost()
    }
  }
  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));


  return (

    <Grow in>
      <Container maxWidth="xl" >
        <Grid className={classes.gridContainer} container justifyContent="space-between" alignItems='stretch' spacing={3} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit' elevation={6}>
              <TextField name='search'
               variant='outlined' 
               label='Search Memories'
                fullWidth
                 value={search} 
                onKeyPress={handleKeyPress} 
                onChange={(e) => setSearch(e.target.value)} />


              <ChipInput
                style={{ margin: '10px  0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
              />
              <Button onClick={searchPost} 
              variant='contained'
               color='primary'>
                 Submit
                 </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className ={classes.pagination}>
              <Pagination page = {page}/>
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>

  )
}

export default Home