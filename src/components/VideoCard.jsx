import { abbreviateNumber } from 'js-abbreviation-number'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from "react-icons/bs"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import VideoLength from "../shared/videoLength"

const VideoCard = ({ video }) => {

    const [avatarUrl, setAvatarUrl] = useState(video?.author?.avatar[0]?.url);

    // This handle when Avatar img not noad or gives error then this custom profile will load
    const handleAvatarError = () => {
        setAvatarUrl('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    };

    return (
        <Link to={`/video/${video?.videoId}`}>
            <div className="flex flex-col mb-8">
                <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
                    <img className='h-full w-full object-cover' src={video?.thumbnails[0]?.url} alt="" />
                    {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )}
                </div>
                <div className="flex text-white mt-3">
                    <div className="flex items-start">
                        <div className="flex h-9 w-9 rounded-full overflow-hidden">
                            {/* Handles Here avatar img error */}
                            <img className='h-full w-full object-cover' src={avatarUrl} onError={handleAvatarError} />
                        </div>
                    </div>
                    <div className="flex flex-col ml-3 overflow-hidden">
                        <span className="text-sm font-bold line-clamp-2">
                            {video?.title}
                        </span>

                        <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                            {video?.author?.title}
                            {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL"
                                ? <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1' />
                                : (
                                    video?.author?.badges[0]?.type === "OFFICIAL_ARTIST_CHANNEL"
                                        ? <FontAwesomeIcon icon={faMusic} className='text-white/[0.5] text-[12px] ml-1'/>
                                        : null
                                )
                            }
                        </span>

                        <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                            <span>
                                {`${abbreviateNumber(video?.stats?.views, 0)} views`}
                            </span>

                            <span className='mx-1 text-[24px] leading-none flex font-bold relative top-[-10px] text-white/[0.7]'>.</span>
                            <span className="truncate">
                                {video?.publishedTimeText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard