import { Loading } from './svg/loading.jsx'

export function LoadingContainer() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col w-full h-full bg-neutral-200 items-center justify-center text-center">
      <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-10 items-center">
          <Loading />

          <div className="text-[22px] text-neutral-900 font-medium">Loading...</div>
        </div>
        <div className="text-sm text-neutral-700 px-5 lg:px-0">Please wait</div>
      </div>
    </div>
  );
}
