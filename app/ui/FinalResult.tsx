'use client';

import React from 'react';

interface FinalResultProps {
  content: any;
  isSuported: boolean;
  platform_title_name: string;
}

export default function FinalResult({ content, isSuported, platform_title_name }: FinalResultProps) {
  if (!isSuported) {
    return (
      <h1 className="text-red-600 font-bold">We are sorry, this version does not cover this situation yet</h1>
    );
  }

  // Step 1: Extract unique platform titles
  const uniquePlatformTitles = Array.from(new Set(content.map((item: any) => item[platform_title_name])));

  // Step 2: Group content by platform title
  const groupedContent = uniquePlatformTitles.map(title => {
    return {
      title,
      content: content.filter((item: any) => item[platform_title_name] === title)
    };
  });

  const setInnerHTML = (htmlContent: string) => {
	// Create a new DOMParser instance
	const parser = new DOMParser();
	// Parse the string to an HTML document
	const doc = parser.parseFromString(htmlContent, 'text/html');
  
	// Create an array to store the content blocks
	const contentBlocks: string[] = [];
	let currentBlock: HTMLElement | null = null;
  
	// Function to finalize the current block and store it
	const finalizeCurrentBlock = () => {
	  if (currentBlock) {
		contentBlocks.push(currentBlock.innerHTML);
	  }
	};
  
	// Loop through the child nodes of the body
	doc.body.childNodes.forEach((node, index) => {
	  if (node.nodeName.toLowerCase() === 'h2') {
		// If we encounter an h2 and we already have a currentBlock, finalize it
		finalizeCurrentBlock();
  
		// Start a new block with the current h2
		currentBlock = document.createElement('div');
		currentBlock.appendChild(node.cloneNode(true));
	  } else {
		// If this is the first node and it's not an h2, start a new block
		if (!currentBlock) {
		  currentBlock = document.createElement('div');
		}
		// Add content to the current block
		currentBlock.appendChild(node.cloneNode(true));
	  }
	});
  
	// Finalize the last block if it exists
	finalizeCurrentBlock();
  
	// Combine the blocks into a single HTML string, each block wrapped in a flex div
	const finalHtml = contentBlocks.map(block => `
	  <div class="flex items-center space-x-4">
		<!-- Icon on the left -->
		<div class="flex-shrink-0">
		  <svg class="h-6 w-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
			<path d="M10 2a8 8 0 11-8 8 8 8 0 018-8zm1 11V7h-2v6h2zm-2 2h2v-2h-2v2z"/>
		  </svg>
		</div>
		<!-- Content on the right -->
		<div class="flex-grow">
		  ${block}
		</div>
	  </div>
	`).join('');
  
	// Return the modified HTML
	return { __html: finalHtml };
  };  

  return (
    <div>
      {groupedContent.map((group, index) => (
        <div key={index}>
          {/* Render the platform title in blue */}
          <h2 className="font-bold text-lg text-blue">{group.title}</h2>

          {/* Render the content associated with the title */}
          {group.content.map((item: any, subIndex: number) => (
            <div key={subIndex} dangerouslySetInnerHTML={setInnerHTML(item.content)} />
          ))}
        </div>
      ))}
    </div>
  );
}
