"use client";

import { FaFileAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaCommentDots } from "react-icons/fa6";
import { FaTag } from "react-icons/fa";
import React from 'react'
import { InfoCard } from '@/components'

export default function Dashboard() {
  return (
    <div className="mb-4">
      <div className="text-default-500 text-large mb-4">快速预览</div>
      <div className="flex space-x-4">
        <InfoCard title="文章" icon={<FaFileAlt />} value={75} bgImg="/images/postbg.jpg" ></InfoCard>
        <InfoCard title="图片" icon={<FaImage />} value={75} bgImg="/images/poster.jpg" valueClass="!text-red-500"></InfoCard>
        <InfoCard title="标签分类" icon={<FaTag />} value={75} bgImg="/images/tag.jpg" valueClass="!text-pink-500"></InfoCard>
        <InfoCard title="留言" icon={<FaCommentDots />} value={75} bgImg="/images/chat.jpg" valueClass="!text-zinc-100"></InfoCard>
      </div>
    </div>
  );
}
