import { useTheme } from '../context/ThemeContext';

export function KPICardSkeleton() {
  const { darkMode } = useTheme();

  return (
    <div
      className="rounded-[16px] border shadow-[0px_4px_12px_0px_rgba(0,0,0,0.06),0px_2px_4px_0px_rgba(0,0,0,0.04)] pt-[32px] px-[28px] pb-[28px] text-left flex flex-col animate-pulse"
      style={{
        backgroundColor: darkMode ? '#1A1F26' : 'white',
        borderColor: darkMode ? '#374151' : '#E5E7EB',
      }}
    >
      {/* Icon skeleton */}
      <div 
        className="w-[40px] h-[40px] rounded-[10px] mb-[20px]"
        style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
      />
      
      {/* Label skeleton */}
      <div 
        className="h-[12px] w-[120px] rounded mb-[12px]"
        style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
      />
      
      {/* Value skeleton */}
      <div 
        className="h-[40px] w-[100px] rounded mb-[8px]"
        style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
      />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <div 
          className="h-[14px] w-full rounded"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
        <div 
          className="h-[14px] w-[80%] rounded"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </div>
    </div>
  );
}

export function ClientCardSkeleton() {
  const { darkMode } = useTheme();

  return (
    <div
      className="rounded-[20px] border p-[28px] animate-pulse"
      style={{
        backgroundColor: darkMode ? '#1A1F26' : 'white',
        borderColor: darkMode ? '#374151' : '#E5E7EB',
      }}
    >
      {/* Logo skeleton */}
      <div 
        className="h-[32px] w-[120px] rounded mb-[24px]"
        style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
      />
      
      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-[24px] mb-[28px]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div 
              className="h-[10px] w-[80px] rounded mb-[8px]"
              style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
            />
            <div 
              className="h-[24px] w-[100px] rounded"
              style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
            />
          </div>
        ))}
      </div>
      
      {/* Button skeleton */}
      <div 
        className="h-[40px] w-full rounded-[8px]"
        style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
      />
    </div>
  );
}

export function ProjectCardSkeleton() {
  const { darkMode } = useTheme();

  return (
    <div
      className="rounded-[20px] border p-[28px] animate-pulse"
      style={{
        backgroundColor: darkMode ? '#1A1F26' : 'white',
        borderColor: darkMode ? '#374151' : '#E5E7EB',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-[24px]">
        <div>
          <div 
            className="h-[20px] w-[200px] rounded mb-[8px]"
            style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
          />
          <div 
            className="h-[14px] w-[150px] rounded"
            style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
          />
        </div>
        <div 
          className="h-[24px] w-[80px] rounded-full"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </div>
      
      {/* Metrics */}
      <div className="space-y-[16px] mb-[24px]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div 
              className="h-[14px] w-[100px] rounded"
              style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
            />
            <div 
              className="h-[16px] w-[80px] rounded"
              style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
            />
          </div>
        ))}
      </div>
      
      {/* Button */}
      <div 
        className="h-[40px] w-full rounded-[8px]"
        style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
      />
    </div>
  );
}

export function TableRowSkeleton() {
  const { darkMode } = useTheme();

  return (
    <tr
      className="animate-pulse"
      style={{
        borderBottom: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
      }}
    >
      <td className="px-[24px] py-[18px]">
        <div className="flex items-center gap-3">
          <div 
            className="w-[32px] h-[32px] rounded-full"
            style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
          />
          <div 
            className="h-[14px] w-[120px] rounded"
            style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
          />
        </div>
      </td>
      <td className="px-[24px] py-[18px]">
        <div 
          className="h-[12px] w-[60px] rounded"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
      <td className="px-[24px] py-[18px]">
        <div 
          className="h-[14px] w-[70px] rounded"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
      <td className="px-[24px] py-[18px]">
        <div 
          className="h-[14px] w-[100px] rounded"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
      <td className="px-[24px] py-[18px] text-right">
        <div 
          className="h-[14px] w-[40px] rounded ml-auto"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
      <td className="px-[24px] py-[18px] text-right">
        <div 
          className="h-[14px] w-[50px] rounded ml-auto"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
      <td className="px-[24px] py-[18px] text-right">
        <div 
          className="h-[14px] w-[60px] rounded ml-auto"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
      <td className="px-[24px] py-[18px]">
        <div 
          className="h-[24px] w-[100px] rounded-[6px]"
          style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}
        />
      </td>
    </tr>
  );
}
