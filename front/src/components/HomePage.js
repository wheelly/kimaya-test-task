import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Button from '@material-ui/core/Button';
import ButtonBase from "@material-ui/core/ButtonBase";
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import {connect, useSelector, useDispatch} from 'react-redux'
import YouTube from 'react-youtube';
import {runSearch} from "../actions/search";

import {withRouter} from "react-router-dom";
import {userConstants} from "../constants";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    top: {
        width: '100%',
        padding: 10,
        textAlign: 'center'
    },
    searchWrapper: {
        width: 400,
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        margin: theme.spacing(1),
    },

    image: {
        width: 120,
        height: 90,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        margin: 10,
    },
    play: {
        margin: theme.spacing(1),
    },
    description: {
        textAlign: 'left',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto',
    },

    topDivider: {
        padding: 5,
    }

}));


function HomePage({runSearch, history}) {
    const classes = useStyles();

    const searchRes = useSelector(state => state.searchCore);
    const playButton = useSelector(state => state.playVideo);
    const [searchString, setSearchString] = useState('');

    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

    const dispatch = useDispatch()

    const signOut = useCallback(
        () => dispatch({type: userConstants.LOGOFF}),
        [dispatch]
    )

    const isAdmin = sessionStorage.getItem('isAdmin')

    return (
        <React.Fragment>

            <Link
                component="button"
                variant="body2"
                onClick={() => {
                    signOut();
                    sessionStorage.setItem('x-auth-token', undefined)
                    history.push('/')
                }}
            >
                Sign out
            </Link>
            {
                isAdmin &&
                <React.Fragment>
                        <span className={classes.topDivider}></span>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => { history.push('/admin')}}
                        >
                            Stats
                        </Link>
                </React.Fragment>
            }

            <Grid container justify="center" className={classes.root} spacing={2}>

                <Grid item xs={12}>
                    <Container className={classes.top}>
                        <Container className={classes.searchWrapper}>
                            <Paper className={classes.search}>
                                <IconButton aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search Youtube Videos"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={
                                        (e) => setSearchString(e.target.value)
                                    }
                                />
                                <IconButton aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider className={classes.divider} orientation="vertical" />
                                <Button variant="contained" className={classes.button} onClick={
                                    async  () => {
                                        try {
                                            console.log(`searchString=${searchString}`)
                                            await runSearch(searchString)
                                        } catch (e) {
                                            console.log(e)
                                        }
                                    }
                                }>
                                    Search
                                </Button>
                            </Paper>
                        </Container>
                    </Container>
                </Grid>

                <Grid item xs={12}>
                    <Grid xs container>

                        <Grid item xs={6}>
                            {
                                searchRes.items && searchRes.items.map( e => {
                                const thumb = e.snippet.thumbnails.default;
                                const snippet = e.snippet;
                                return (
                                    <Description //here we have everything for stats excepts for ?videoDuration
                                        videoId={e.id.videoId}
                                        thumb={thumb}
                                        snippet={snippet}
                                        key={e.id.videoId}
                                        searchString={searchString}
                                    />
                                )})
                            }
                        </Grid>
                        <Grid id='youtube-player' key='player' item xs={6}>
                            <YouTube
                                videoId={playButton ? playButton.videoId : userConstants.DEFAULT_VIDEO}
                                opts={opts}
                                onReady={e => (e.target.pauseVideo())}
                            />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const Description = ({snippet, thumb, videoId, searchString}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const playMe = useCallback(
        () => dispatch({
            type: userConstants.PLAY_BUTTON_CLICKED,
            videoId, searchString, thumbUrl: thumb.url
        }),
        [dispatch, videoId, searchString, thumb]
    )

    return (
        <Paper className={classes.paper}>
            <Grid key={videoId} container xs={12} spacing={2}>
                <Grid item xs={3} className={classes.description}>
                    <ButtonBase className={classes.image} onClick={playMe}>
                        <img className={classes.img} alt='' src={thumb.url}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={7} className={classes.description}>
                    <Typography gutterBottom variant="subtitle1">{snippet.title}</Typography>
                    <Typography variant="body2">{snippet.description}</Typography>
                </Grid>
                <Grid item container xs={2}>

                    <Grid item xs className={classes.description}>
                    <Fab variant="extended" aria-label="play" className={classes.play} onClick={playMe}>
                        <PlayCircleOutlineIcon/>
                    </Fab>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>
    )
}

export default withRouter(connect(null, {
    runSearch
})(HomePage))

