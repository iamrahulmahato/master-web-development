import React, { useState } from 'react';
import { Button, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, createTheme, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { saveAs } from 'file-saver';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as XLSX from 'xlsx';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [links, setLinks] = useState([]);
    const [selectedStates, setSelectedStates] = useState({});

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const extractLinks = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const contents = e.target.result;
            const text = contents.replace(/(?:\r\n|\r|\n)/g, ' ');
            const regex = /https?:\/\/[^\s)]+/g;
            const extractedLinks = text.match(regex) || [];
            setLinks(extractedLinks.map(link => ({ url: link, completionState: 'Pending' })));
        };
        reader.readAsText(file);
    };

    const downloadExcelFile = () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }
        const data = links.map(link => ({ Link: link.url, 'Completion State': link.completionState }));
        const newData = XLSX.utils.json_to_sheet(data);

        // Add data validation for each cell in the 'Completion State' column
        const completionStateOptions = ['Pending', 'Revisit', 'Done'];
        data.forEach((_, index) => {
            const cellAddress = `B${index + 2}`; // Assuming the data starts from B2
            newData[cellAddress].l = {
                Target: '',
                Tooltip: '',
                DataValidation: {
                    Type: 'dropdown',
                    AllowBlank: true,
                    Formula1: completionStateOptions.join(','),
                    ShowErrorMessage: true,
                    ErrorTitle: '',
                    Error: 'Please select a valid option.',
                    ShowInputMessage: true,
                    PromptTitle: '',
                    Prompt: 'Select a completion state from the dropdown.',
                },
            };
        });

        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, newData, 'Links');
        const excelBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
        const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(fileData, 'links.xlsx');
    };

    const handleCompletionStateChange = (e, index) => {
        const { value } = e.target;
        const updatedLinks = [...links];
        updatedLinks[index].completionState = value;
        setLinks(updatedLinks);
    };


    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#90caf9',
            },
            secondary: {
                main: '#ffcc80',
            },
        },
    });

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <ThemeProvider theme={theme}>
            <Container style={{ marginTop: "35px", marginBottom: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h3" style={{ marginBottom: '20px', color: "white" }}>DocXtract</Typography>
                <Paper style={{ padding: '20px', width: "1000px" }}>
                    <Typography variant="h5" style={{ marginBottom: '10px' }}>Upload PDF</Typography>
                    {/* <input type="file" onChange={handleFileChange} /> */}
                    <Button
                        component="label"
                        role={undefined}
                        size='small'
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
                    </Button>
                    <Button size='small' variant="contained" onClick={extractLinks} style={{ marginLeft: '10px' }}>Extract Links</Button>
                    <Button size='small' variant="contained" onClick={downloadExcelFile} style={{ marginLeft: '10px' }}>Download Excel File</Button>
                    <TableContainer style={{ marginTop:"15px",display: "flex", justifyContent: "center",maxHeight:"540px", overflowY: 'auto', scrollbarWidth: 'none', width: '100%' }}>
                        <Table>
                            <TableHead style={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: theme.palette.background.paper,width:"100%" }}>
                                <TableRow>
                                    <TableCell style={{width:"75px"}}>SR. No.</TableCell>
                                    <TableCell>Link</TableCell>
                                    <TableCell style={{width:"150px"}}>Completion State</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {links.map((link, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell><a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>{link.url}</a></TableCell>
                                        <TableCell>
                                            <Select
                                                value={selectedStates[index] || link.completionState}
                                                onChange={(e) => {
                                                    const newState = e.target.value;
                                                    setSelectedStates({ ...selectedStates, [index]: newState });
                                                }}
                                                style={{
                                                    backgroundColor: selectedStates[index] === 'Pending' ? 'red' :
                                                        selectedStates[index] === 'Done' ? 'green' :
                                                            selectedStates[index] === 'Revisit' ? 'blue' : 'red',
                                                    width: "110px",
                                                    height:"30px"
                                                }}
                                            >
                                                <MenuItem value="Pending" style={{ color: 'red' }}>Pending</MenuItem>
                                                <MenuItem value="Revisit" style={{ color: 'blue' }}>Revisit</MenuItem>
                                                <MenuItem value="Done" style={{ color: 'green' }}>Done</MenuItem>
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default FileUpload;
