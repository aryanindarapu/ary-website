'use client'

import React, { useState, useReducer }from 'react';
// import { allBlogs } from 'contentlayer/generated';
import { blogData } from './posts.js';
import '../styles.css';
import './index.css';
import { AiFillCaretRight } from 'react-icons/ai';


import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('name', {
        header: 'Article Title',
        cell: info => 
            <div style={{justifyContent: 'left', textAlign: 'left'}} className='descriptionBlog'>
                <a href={info.row.original.link} target="_blank" rel="noopener noreferrer">
                    <h4>{info.renderValue()}</h4>
                    <p>{info.row.original.date}</p>

                    {/* {info.renderValue()} <br />
                    {info.row.original.date} */}
                </a>
                
            </div>
        
    }),
    // columnHelper.accessor('date', {
    //     header: 'Date Published',
    //     footer: info => info.column.id,
    // }),
    columnHelper.accessor('link', {
        header: 'Next',
        cell: info => <a href={info.getValue()} target="_blank" rel="noopener noreferrer"><AiFillCaretRight className="iconSmall" /></a>,
    }),
]

export default function Blog() {
    const [data, setData] = React.useState(() => [...blogData].reverse())

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })


    return (
        <div className="pageContainerBlog">
            <table style={{width: '100%'}}>
                {/* <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                    </tr>
                ))}
                </thead> */}
                <tbody style={{fontSize: '1.08rem',textAlign: 'left'}}>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


{/* {blogData.reverse().map((post) => (
                    // <div className="row" style={{height: '10vw', justifyContent: 'center'}}>
                    //     <a href=''><h2>{post.name}</h2></a>
                    //     <ColoredLine color="black" />
                    // </div>
                    <tr>
                        <th>{post.name}</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                    
                ))} */}

// {blogData
//     .sort((a, b) => {
//     if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
//         return -1;
//     }
//     return 1;
//     })
//     .map((post) => (
//     <Link
//         key={post.slug}
//         className="flex flex-col space-y-1 mb-4"
//         href={`/blog/${post.slug}`}
//     >
//         <div className="w-full flex flex-col">
//         <p>{post.title}</p>
//         {/* <ViewCounter slug={post.slug} trackView={false} /> */}
//         </div>
//     </Link>
//     ))
// }