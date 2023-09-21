import  {Box, Divider, Drawer, Toolbar, Typography, List} from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({drawerWidth = 240}) => {

    const {notes} = useSelector((state) => state.journal);

    const {displayName} = useSelector((state) => state.auth);


    return (
			<Box
				component="nav"
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
				}}>
				<Drawer
					variant="permanent" //temporary si la idea es ocultarlo y mostrarlo
					open={true}
					sx={{
						display: { xs: "block" },
						"& .MuiDrawer-paper": {
							//para darle estilos al drawer
							width: drawerWidth,
							boxSizing: "border-box",
						},
					}}>
					<Toolbar>
						<Typography variant="h6" noWrap component="div">
							{displayName}
						</Typography>
					</Toolbar>
					<Divider />

					<List>
						{notes.map((note) => (
                            <SideBarItem key={note.id} {...note} />
						))}
					</List>
				</Drawer>
			</Box>
		);


};