import { CircularProgress } from "@mui/material";

const Loading = () => 
    (
        <div style={{
            zIndex: 100,
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <CircularProgress />
          </div>
    )
export default Loading;

