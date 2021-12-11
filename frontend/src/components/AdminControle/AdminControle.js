import React , {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import ImageThumbnail from '../ImageThumbnail';
import {fetchAuthors} from '../../store/actions/authorActions';
import {
    fetchAlbums,
    getTracks,
    deleteAlbum,
    deleteArtist,
    deleteTrack,
    toggleTrackPublish,
    toggleAlbumPublish,
    toggleArtistPublish,
} from '../../store/actions/albumActions';

const AdminControle = ({match}) => {
    const dispatch = useDispatch();
    const authors = useSelector(state => state.authors.authors);
    const tracks = useSelector(state => state.albums.tracks);
    const albums = useSelector(state => state.albums.albums);

    useEffect(() => {
        dispatch(fetchAlbums());
        dispatch(fetchAuthors());
        dispatch(getTracks());
        dispatch(deleteAlbum(match.params.id));
        dispatch(deleteArtist(match.params.id));
        dispatch(deleteTrack(match.params.id));
        dispatch(toggleTrackPublish(match.params.id));
        dispatch(toggleAlbumPublish(match.params.id));
        dispatch(toggleArtistPublish(match.params.id));
    }, [dispatch , match.params.id]);

    const deleteArtist = e => {
        dispatch(deleteArtist(e.target.id));
    };

    const deleteAlbum = e => {
        dispatch(deleteAlbum(e.target.id));
    };

    const deleteTrack = e => {
        dispatch(deleteTrack(e.target.id));
    };

    const togglePublishArtist = e => {
        dispatch(togglePublishArtist(e.target.id));

    };

    const togglePublishAlbum = e => {
        dispatch(togglePublishAlbum(e.target.id));
    };

    const togglePublishTrack = e => {
        dispatch(togglePublishTrack(e.target.id));
    };

    return (
        <>
            <div className="column">
                <p className="album_p">Artists</p>
                {authors ? authors.map(artist => <div className="artist_thumbnail"
                    key={artist._id}>
                    <ImageThumbnail image={artist.image} />
                    <p>{artist.name}</p>
                    {!artist.published ? <button id={artist._id} className="publish_btn"
                        onClick={togglePublishArtist}>Publish</button> :
                        <button id={artist._id} className="delete_btn"
                            onClick={deleteArtist}>Delete</button>}

                </div>) : null}

                <p className="album_p">Albums</p>
                {albums ? albums.map(item => {
                    return <div className="artist_thumbnail" key={item._id}>
                        <ImageThumbnail image={item.image} />
                        <p>{item.title}</p>
                        <p>{item.year}-y.</p>
                        {!item.published ? <button id={item._id} className="publish_btn"
                            onClick={togglePublishAlbum}>Publish</button> :
                            <button id={item._id} className="delete_btn"
                                onClick={deleteAlbum}>Delete</button>}
                    </div>
                }) : null}

                <p className="album_p">Tracks</p>
                {tracks ? tracks.map(item => {
                    return <div className="artist_thumbnail" key={item._id}>
                        <span>{item.number}. </span>
                        <span id={item._id}> {item.title} </span>
                        <span> {item.duration} </span>
                        {!item.published ? <button id={item._id} className="publish_btn"
                            onClick={togglePublishTrack}>Publish</button> :
                            <button id={item._id} className="delete_btn"
                                onClick={deleteTrack}>Delete</button>}
                    </div>
                }) : null}
            </div>
        </>
    )
}

export default AdminControle;
