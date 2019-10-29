import React, { useCallback } from 'react';
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
    }
}));


function HomePage({runSearch}) {
    const classes = useStyles();

    const searchRes = useSelector(state => state.searchCore);
    const playButton = useSelector(state => state.playVideo);

    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    };

    let q = ''

    return (
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
                                onChange={ e => q = e.target.value }
                            />
                            <IconButton aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <Divider className={classes.divider} orientation="vertical" />
                            <Button variant="contained" className={classes.button} onClick={
                                async  () => {
                                    try {
                                        await runSearch(q)
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
                <Grid container>
                        <Grid item xs={7}>
                            {
                                searchRes.items && searchRes.items.map( e => {
                                const thumb = e.snippet.thumbnails.default;
                                const snippet = e.snippet;
                                return <Description videoId={e.id.videoId} thumb={thumb} snippet={snippet}/>
                                })
                            }
                        </Grid>
                        <Grid id='youtube-player' key='player' item xs={5}>
                            <YouTube
                                videoId={playButton ? playButton.videoId : userConstants.DEFAULT_VIDEO}
                                opts={opts}
                                onReady={e => (e.target.pauseVideo())}
                            />
                        </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
}

const Description = ({snippet, thumb, videoId}) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    const playMe = useCallback(
        () => dispatch({type: userConstants.PLAY_BUTTON_CLICKED, playButton: videoId}),
        [dispatch]
    )

    return (
        <Paper className={classes.paper}>
            <Grid container xs={12} spacing={2}>
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

                    <Grid item className={classes.description}>
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

