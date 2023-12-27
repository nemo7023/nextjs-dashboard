'use client';
import React, { useState } from 'react';
import Card from '@/app/ui/mandarat/card';

export default function Page({ params }: { params: { mandartId: string } }) {
  return (
    <div className=" grid grid-cols-3 items-center  justify-center gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((sectionId) => (
        <div key={sectionId}>
          <Card
            id={sectionId}
            title="Example Card"
            description="This is a sample card component using Tailwind CSS and TypeScript."
          />
        </div>
      ))}
    </div>
  );
}
