import DefaultPopup from "@/app/main/component/popup/DefaultPopup"

async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
  }

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    // const { data, mutate } = useSWR('/api/data', fetch)

    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => { setVisible(false) }
    const sendData = async () => {
        const newData = {
            id : 'ppppp-1111',
            name : 'abdc',
            creatorId   : 'admin'
        }

        try {
          // Update the local state immediately and fire the
          // request. Since the API will return the updated
          // data, there is no need to start a new revalidation
          // and we can directly populate the cache.
          await  fetch('/api/project', {
              method: 'POST',
              body: JSON.stringify(newData)
            });
        } catch (e) {
          // If the API errors, the original data will be
          // rolled back by SWR automatically.
          console.log(e);
        }
      }

    return(
            <div className="dialog-content">
                <div className="dialog-input-container"> 
                        <span>이름</span>
                        <input></input>
                </div>
                <div className="dialog-button-container">
                    <button className="dialog-button btn-can" onClick={handleCloseBtn}>취소</button>
                    <button className="dialog-button btn-ok" onClick={sendData}>확인</button>
                </div>
            </div>
    );
}

const popupWidth : number = 360;
const popupHeight : number = 80;

export default function NewProjectPopup(
    {
        visible,
        setVisible
    } : {
        visible : boolean,  
        setVisible : (visible : boolean) => void
    }) {
        return (
        <DefaultPopup
            title='프로젝트 생성'
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content setVisible={setVisible}/>
        </DefaultPopup>);
}