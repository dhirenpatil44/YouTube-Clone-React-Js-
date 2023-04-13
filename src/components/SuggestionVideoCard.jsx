import { abbreviateNumber } from 'js-abbreviation-number'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsFillCheckCircleFill } from "react-icons/bs"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import VideoLength from "../shared/videoLength"

const SuggestionVideoCard = ({ video }) => {
    const [avatarUrl, setAvatarUrl] = useState(video?.author?.avatar[0]?.url);

    // This handle when Avatar img not noad or gives error then this custom profile will load
    const handleAvatarError = () => {
        setAvatarUrl('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    };

    return (
        <Link to={`/video/${video?.videoId}`}>
            <div className="flex mb-3">
                <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl bg-slate-800 overflow-hidden">
                    <img className='h-full w-full object-cover' src={video?.thumbnails[0]?.url} alt="" />
                    {video?.lengthSeconds && (
                        <VideoLength time={video?.lengthSeconds} />
                    )}
                </div>
                <div className="flex flex-col ml-3 overflow-hidden">
                    <span className="text-sm lg:text-xs font-bold line-clamp-2 text-white">
                        {video?.title}
                    </span>

                    <span className="text-[12px] flex items-center lg:texr-[10px] xl:text-[12px] font-semibold mt-2 text-white/[0.7]">
                        {video?.author?.title}
                        {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL"
                            ? <BsFillCheckCircleFill className='text-white/[0.5] text-[12px] ml-1' />
                            : (
                                video?.author?.badges[0]?.type === "OFFICIAL_ARTIST_CHANNEL"
                                    ? <FontAwesomeIcon icon={faMusic} className='text-white/[0.5] text-[12px] ml-1' />
                                    : null
                            )
                        }
                    </span>

                    <div className="flex text-[12px] lg:texr-[10px] xl:text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
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
        </Link>
    )
}

export default SuggestionVideoCard