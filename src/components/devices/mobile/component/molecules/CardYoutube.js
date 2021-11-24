import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import CardHeadingMobile from './CardHeadingMobile';
import CardScrollHorizontal from './CardScrollHorizontal';

export default function CardYoutube() {
  const [dataYoutube, setdataYoutube] = useState([]);
  const YOUTUBE_PLAYLIST_ITEMS_API = `https://www.googleapis.com/youtube/v3/playlistItems`;

  const handlerClickYoutube = (event, data) => {
    const linkYoutube = 'https://www.youtube.com/watch';
    window.open(`${linkYoutube}?v=${data}`, '_blank').focus();
  };

  useEffect(() => {
    axios
      .get(
        ` ${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=PLMrgP0P9dmMyLfzSHY7XhX2leEgUZVIJc&key=${process.env.REACT_APP_YOUTUBE_API_KEY} `,
      )
      .then((res) => {
        setdataYoutube(res.data.items);
      })
      .catch((err) => {
        console.log('error yutub', err.response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mt-6">
      <CardHeadingMobile heading="PINS Radio" />
      <CardScrollHorizontal>
        {dataYoutube.length > 0 ? (
          dataYoutube.map((item) => (
            <motion.div
              onClick={(e) =>
                handlerClickYoutube(e, item.snippet.resourceId.videoId)
              }
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.1 }}
              key={item.id}
              className="flex flex-col flex-none w-64 rounded-md">
              <img
                src={item.snippet.thumbnails.high?.url}
                alt={item.id}
                className="h-44 rounded"
              />
              <div className="flex flex-col mt-2">
                <span className="text-xs font-light text-warmGray-500 mb-1">
                  {item.snippet.channelTitle}
                </span>
                <h1 className="text-sm font-semibold text-gray-800 capitalize mb-1">
                  {item.snippet.title}
                </h1>
                <span className="text-xs font-light text-warmGray-500 tracking-wide mt-1 pb-2">
                  {item.snippet.description.substring(0, 100) + ' ...'}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <p>Data Kosong</p>
        )}
      </CardScrollHorizontal>
    </div>
  );
}
