import EditTask from "../../EditTask";
import Footer from "../../Footer";
import Header from "../../Header";

import TaskList from "../../TaskList";
import "./AppLayout.css";

function AppLayout({ headerTitle }: { headerTitle: string }) {
  const editMode = headerTitle === "Edit Task";

  return (
    <div className="Home">
      <Header title={headerTitle} />
      {editMode ? <EditTask /> : <TaskList />}
      <Footer />
    </div>
  );
}

export default AppLayout;
