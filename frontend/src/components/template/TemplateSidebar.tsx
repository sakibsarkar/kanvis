import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
const TemplateSidebar = () => {
    return (
        <aside className="w-64 mr-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="free" 
            />
            <label htmlFor="free">Free Templates</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="paid" 
            />
            <label htmlFor="paid">Paid Templates</label>
          </div>
        </div>
      </aside>
    );
};

export default TemplateSidebar;