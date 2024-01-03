import '../../src/css/dropdown-menu.css'

export default function DropdownMenu() {
    return (
        <div className='flex-container dropdown'>
            <div className='dropdownbtn'>
                File
                <div className='dropdown-content'>
                    <a href='#1'> Link 1</a>
                    <a href='#2'> Link 2</a>
                    <a href='#3'> Link 3</a>
                    <a href='#4'> Link 4</a>
                </div>
            </div>
            <div className='dropdownbtn'>
                Edit
                <div className='dropdown-content'>
                    <a href='#5'> Link 5</a>
                    <a href='#6'> Link 6</a>
                    <a href='#7'> Link 7</a>
                    <a href='#8'> Link 8</a>
                </div>
            </div>
            <div className='dropdownbtn'>
                Selection
                <div className='dropdown-content'>
                    <a href='#9'> Link 9</a>
                    <a href='#10'> Link 10</a>
                    <a href='#11'> Link 11</a>
                    <a href='#12'> Link 12</a>
                </div>
            </div>
            <div className='dropdownbtn'>
                View
                <div className='dropdown-content'>
                    <a href='#13'> Link 13</a>
                    <a href='#14'> Link 14</a>
                    <a href='#15'> Link 15</a>
                    <a href='#16'> Link 16</a>
                </div>
            </div>
            <div className='dropdownbtn'>
                Go
                <div className='dropdown-content'>
                    <a href='#17'> Link 17</a>
                    <a href='#18'> Link 18</a>
                    <a href='#19'> Link 19</a>
                    <a href='#20'> Link 20</a>
                </div>
            </div>
        </div>
    );
}
