const projectGrid =
 "grid-cols-[minmax(280px,2fr)_120px_110px_130px_120px_60px_120px_40px]";

const ProjectsTableHeader = () => { return ( <div className={`hidden items-center gap-4  px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-foreground-muted lg:grid ${projectGrid}`} >
      <span>Name</span>
      <span>Health</span>
      <span>Priority</span>
      <span>Lead</span>
      <span>Target Date</span>
      <span>Issues</span>
      <span>Status</span>
    </div>
  );
};

export default ProjectsTableHeader;
export { projectGrid };
