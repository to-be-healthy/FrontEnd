'use client';

import { useRouter } from 'next/navigation';

import { IconBack } from '@/shared/assets';
import { usePreviousPage } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const PolicyTermsPage = () => {
  const router = useRouter();
  const { hasPreviousPage } = usePreviousPage();

  if (hasPreviousPage === null) {
    return null;
  }

  return (
    <Layout>
      <Layout.Header>
        {hasPreviousPage && (
          <button onClick={() => router.back()}>
            <IconBack />
          </button>
        )}
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD, 'layout-header-title')}>
          이용약관
        </h1>
      </Layout.Header>
      <Layout.Contents className='policy-container'>
        <h2>이용약관</h2>
        <section>
          <h3>제 1조 [목적]</h3>
          <p>{`본 약관은 건강해짐(이하 "회사"라 함)이 제공하는 PT 예약 관리 서비스 (이하 "서비스"라 함) 이용과 관련하여, 회사와 회원 간 또는 회원 간의 권리 및 의무 및 책임사항 및 서비스 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.`}</p>
        </section>
        <section>
          <h3>제 2조 [정의]</h3>
          <ol>
            <li>{`"회사"라 함은 "콘텐츠" 산업과 관련된 경제활동을 영위하는 자로서 콘텐츠 및 제반서비스를 제공하는 자를 말합니다.`}</li>
            <li>{`"사이트"란 재화 또는 용역(이하 "재화등"이라 함)을 이용자에게 제공하기 위하여 컴퓨터나 핸드폰 등 정보통신설비를 이용하여 재화등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.`}</li>
            <li>{`"이용자"라 함은 "회사"의 사이트에 접속하여 이 약관에 따라 "회사"가 제공하는 "콘텐츠" 및 제반서비스를 이용하는 회원 및 비회원을 말합니다.`}</li>
            <li>{`"회원"이라 함은 "사이트"에 회원 등록을 한 자로서, 계속적으로 "사이트"가 제공하는 서비스를 이용할 수 있는 자를 말합니다.`}</li>
            <li>{`"비회원"이라 함은 "회원"이 아니면서 "회사"가 제공하는 서비스를 이용하는 자를 말합니다.`}</li>
            <li>{`콘텐츠"라 함은 정보통신망이용촉진 및 정보보호 등에 관한 법률 제2조 제1항 제1호의 규정에 의한 정보통신망에서 사용되는 부호·문자·음성·음향·이미지 또는 영상 등으로 표현된 자료 또는 정보로서, 그 보존 및 이용에 있어서 효용을 높일 수 있도록 전자적 형태로 제작 또는 처리된 것을 말합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 3조 [약관 등의 명시와 설명 및 개정]</h3>
          <ol>
            <li>{`"사이트"는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소, 전화번호  · 전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자등을 이용자가 쉽게 알 수 있도록 "사이트"의 초기 서비스 화면에 게시합니다.`}</li>
            <li>{`"사이트"는 이용자가 약관을 동의하기에 앞서 약관에 정하여져 있는 내용 중 환불 조건과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결 화면 또는 팝업 화면 등을 제공하여 이용자의 확인을 구하여야 합니다.`}</li>
            <li>{`"사이트"는 「전자상거래 등에서의 소비자보호에 관한 법률」 , 「약관의 규제에 관한 법률」 , 「전자문서 및 전자거래기본법」 , 「전자금융거래법」 , 「전자서명법」 , 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 , 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.`}</li>
            <li>{`"사이트"가 이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 사이트의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고 공지합니다. 이 경우 "사이트"는 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.`}</li>
            <li>{`"사이트"가 약관을 개정할 경우에는 그 개정 약관은 그 적용 일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관 조항이 그대로 적용됩니다. 다만 이미 계약을 체결한 이용자가 개정 약관 조항의 적용을 받기를 원하는 뜻을 제 3항에 의한 개정 약관의 공지기간 내에 "사이트"에 송신하여 "사이트"의 동의를 받은 경우에는 개정약관 조항이 적용됩니다.`}</li>
            <li>{`이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제 등에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 4조 [서비스의 제공 및 변경]</h3>
          <ol>
            <li>
              <p>{`"사이트"는 다음과 같은 업무를 수행합니다.`}</p>
              <ul>
                <li>{`재화 또는 용역에 대한 정보 제공 및 구매계약의 체결`}</li>
                <li>{`구매계약이 체결된 재화 또는 용역의 제공`}</li>
                <li>{`기타 "사이트"가 정하는 업무`}</li>
              </ul>
            </li>
            <li>{`"사이트"는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다. 이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다.`}</li>
            <li>{`"사이트"가 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다.`}</li>
            <li>{`전항의 경우 "사이트"는 이로 인하여 이용자가 입은 손해를 배상합니다. 다만, "사이트"가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 5조 [서비스의 중단]</h3>
          <ol>
            <li>{`"사이트"는 컴퓨터 등 정보통신설비의 보수점검 · 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.`}</li>
            <li>{`"사이트"는 제 1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제 3자가 입은 손해에 대하여 배상합니다. 단, "사이트"가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.`}</li>
            <li>{`사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 "사이트"는 제 8조에 정한 방법으로 이용자에게 통지하고 당초 "사이트"에서 제시한 조건에 따라 소비자에게 보상합니다. 다만, "사이트"가 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 "사이트"에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 6조 [회원가입]</h3>
          <ol>
            <li>{`이용자는 "사이트"가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.`}</li>
            <li>
              <p>{`"사이트"는 제 1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.`}</p>
              <ul>
                <li>{`가입신청자가 이 약관 제 7조 제 3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우. 다만 제 7조 제 3항에 의한 회원자격 상실 후 3년이 경과한 자로서 "사이트"의 회원재가입 승낙을 얻은 경우에는 예외로 한다.`}</li>
                <li>{`등록 내용에 허위, 기재누락, 오기가 있는 경우`}</li>
                <li>{`기타 회원으로 등록하는 것이 "사이트"의 기술상 현저히 지장이 있다고 판단되는 경우`}</li>
              </ul>
            </li>
            <li>
              {`회원가입계약의 성립 시기는 "사이트"의 승낙이 회원에게 도달한 시점으로 합니다.`}
            </li>
            <li>
              {`회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 "사이트"에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.`}
            </li>
          </ol>
        </section>
        <section>
          <h3>제 7조 [회원 탈퇴 및 자격 상실 등]</h3>
          <ol>
            <li>{`회원은 "사이트"에 언제든지 탈퇴를 요청할 수 있으며 "사이트"는 즉시 회원탈퇴를 처리합니다.`}</li>
            <li>
              <p>
                {`회원이 다음 각 호의 사유에 해당하는 경우, "사이트"는 회원자격을 제한 및 정지시킬 수 있습니다.`}
              </p>
              <ul>
                <li>{`가입 신청 시에 허위 내용을 등록한 경우`}</li>
                <li>{`"사이트"를 이용하여 구입한 재화 등의 대금, 기타 "사이트"이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우`}</li>
                <li>{`다른 사람의 "사이트"이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우`}</li>
                <li>{`"사이트"를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우`}</li>
                <li>{`"사이트"가 회원 자격을 제한 · 정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 "사이트"는 회원자격을 상실시킬 수 있습니다.`}</li>
              </ul>
            </li>
            <li>{`"사이트"가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 8조 [회원에 대한 통지]</h3>
          <ol>
            <li>{`"사이트"가 회원에 대한 통지를 하는 경우, 회원이 "사이트"와 미리 약정하여 지정한 전자우편 주소에 발송으로 할 수 있습니다.`}</li>
            <li>{`"사이트"는 불특정다수 회원에 대한 통지의 경우 1주일 이상 "사이트" 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 9조 [구매신청 및 개인정보 제공 동의 등]</h3>
          <ol>
            <li>
              <p>
                {`"사이트" 이용자는 "사이트" 상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, "사이트"는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.`}
              </p>
              <ul>
                <li>{`컨텐츠 목록의 열람 및 선택`}</li>
                <li>{`컨텐츠의 상세 정보 확인`}</li>
                <li>{`구매 신청`}</li>
                <li>{`결제 수단 선택`}</li>
                <li>{`결제 금액 확인`}</li>
                <li>{`결제`}</li>
              </ul>
            </li>
            <li>{`"회원"은 "회사"에서 정하고 있는 방법으로 유료 서비스의 결제가 가능합니다. 다만, 각 결제수단마다 결제수단의 특성에 따른 일정한 제한이 있을 수 있습니다.`}</li>
            <li>{`"사이트"가 제 3자에게 구매자 개인정보를 제공할 필요가 있는 경우 1) 개인정보를 제공받는 자, 2) 개인정보를 제공받는 자의 개인정보 이용 목적, 3) 제공하는 개인정보의 항목, 4) 개인정보를 제공받는 자의 개인정보 보유 및 이용 기간을 구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도 같습니다.)`}</li>
            <li>{`"사이트"가 제 3자에게 구매자의 개인정보를 취급할 수 있도록 업무를 위탁하는 경우에는 1) 개인정보 취급위탁을 받는 자, 2) 개인정보 취급위탁을 하는 업무의 내용을 구매자에게 알리고 동의를 받아야 합니다. (동의를 받은 사항이 변경되는 경우에도 같습니다.) 다만, 서비스제공에 관한 계약이행을 위해 필요하고 구매자의 편의증진과 관련된 경우에는 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 에서 정하고 있는 방법으로 개인정보 취급방침을 통해 알림으로써 고지절차와 동의절차를 거치지 않아도 됩니다.`}</li>
            <li>{`회사는 이용자의 정보를 수시로 저장하고 찾아내는 '쿠키(cookie)' 등을 운용합니다. 쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. 회사는 다음과 같은 목적을 위해 쿠키를 사용합니다.`}</li>
            <li>{`회원과 비회원의 접속 빈도나 방문 시간, 이벤트 참여 등을 분석하여 이용자의 취향과 관심분야를 추론하며 이를 바탕으로 마케팅 및 개인 맞춤 서비스 제공합니다. 이용자는 쿠키 설치에 대한 선택권을 가지고 있으나, 거부하는 경우 해당 정보를 이용한 맞춤 서비스 제공은 어려울 수 있습니다. 따라서 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 10조 [계약의 성립]</h3>
          <ol>
            <li>
              <p>{`"사이트"는 제 9조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.`}</p>
              <ul>
                <li>{`유료 서비스의 이용 대금을 납입하지 않는 경우`}</li>
                <li>{`유료 서비스의 이용 대금과 납입금 총액이 일치하지 않는 경우`}</li>
                <li>{`기타 합리적인 이유가 있는 경우로서 회사가 필요하다고 인정하는 경우`}</li>
              </ul>
            </li>
            <li>{`"사이트"의 승낙이 제 12조 제 1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.`}</li>
            <li>{`"사이트"의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매 가능 여부, 구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 11조 [지급방법]</h3>
          <ol>
            <li>
              <p>
                {`"사이트"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다. 단, "사이트"는 이용자의 지급 방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.`}
              </p>
              <ul>
                <li>{`폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체`}</li>
                <li>{`선불카드, 직불카드, 신용카드 등의 각종 카드 결제`}</li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <h3>제 12조 [수신확인통지 · 구매신청 변경 및 취소]</h3>
          <ol>
            <li>{`"사이트" 는 이용자의 구매신청이 있는 경우 본 약관 제 8조의 방법을 통하여 이용자에게 수신확인통지를 합니다.`}</li>
            <li>{`수신확인통지를 받은 이용자의 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 "사이트"는 재화와 서비스의 제공 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만 이미 대금을 지불한 경우에는 제 15조의 청약철회 등에 관한 규정에 따릅니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 13조 [재화 등의 공급]</h3>
          <ol>
            <li>{`"사이트"는 서비스의 공급시기를 당해 서비스 상세 설명과 함께 명시하여 이용자가 알기 쉽게 제공합니다.`}</li>
            <li>{`"이용자"는 서비스의 이용 권한과 기타 이용 계약상 지위를 타인에게 양도하거나 증여할 수 없으며, 담보로 제공할 수 없습니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 14조 [환급]</h3>
          <p>{`"사이트"는 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 3 영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.`}</p>
        </section>
        <section>
          <h3>제 15조 [관계법령상 환불정책]</h3>
          <ol>
            <li>{`"사이트"의 본 약관 상 환불규정 등은 "약관의 규제에 관한 법률", "온라인 디지털콘텐츠산업 발전법", "전자상거래 등에서의 소비자보호에 관한 법률" 등을 반영하였습니다.`}</li>
            <li>
              <p>{`이용자의 서비스 이용이 다음의 각 항에 해당하는 경우, 전 항의 관계법령에 따른 청약철회가 불가합니다.`}</p>
              <ul>
                <li>{`청약철회가 불가능한 서비스에 대하여 해당 사실을 표시사항에 포함한 경우`}</li>
                <li>{`이벤트, 테스트 등의 목적으로 서비스를 제공한 경우`}</li>
                <li>{`한시적 또는 일부 이용 등의 방법을 제공한 경우`}</li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <h3>제 16조 [회사의 환불규정]</h3>
          <ol>
            <li>{`"이용자"의 부득이한 사정으로 멤버십 서비스를 지속할 수 없을 경우, 이용자는 다음 달 멤버십을 예약해지할 수 있습니다.`}</li>
            <li>{`"이용자"가 해당 서비스의 다음달 이용신청을 취소하고자 하는 경우에는 앱 내 구독관리 페이지에서 예약해지를 진행해야 합니다. 예약해지를 신청하면 해지가 진행되는 다음 결제일 전까지 건강해짐 서비스를 계속 이용할 수 있습니다. 낮은 레벨의 멤버십으로 변경하는 경우 역시 마찬가지로 앱 내 구독관리 페이지에서 변경 가능하며, 다음 결제일 전까지 기존 멤버십을 이용하다 결제일을 기준으로 변경됩니다.`}</li>
            <li>{`"이용자"는 "사이트"가 제공하는 멤버십 서비스를 환불 및 변경할 수 있습니다. 단, 멤버십 결제가 이루어진지 7일이 지났거나 7일 이내더라도 "이용자"가 멤버십 서비스를 이용한 내역이 있다면 환불이 불가능합니다. 회사는 해당 내용에 대해 결제 단계에서 충분히 고지하며, "이용자"는 첫 달 결제 때 해당 내용을 승인해야 유료서비스를 이용할 수 있습니다.`}</li>
            <li>
              <p>{`다음 각 호의 경우에 "이용자"는 환불을 요청할 수 없습니다.`}</p>
              <ul>
                <li>{`결제 후 멤버십 서비스에서 제공하는 기능을 이용한 경우`}</li>
                <li>{`가장 최근의 멤버십 결제가 이루어진지, 만 7일이 지난 경우`}</li>
                <li>{`서비스 업데이트를 통한 문제 해결이 가능함에도 회원의 의사로 이를 거부하여 서비스를 이용하지 못하는 경우`}</li>
                <li>{`회원의 실수로 해당 서비스를 이용하지 못하는 경우`}</li>
              </ul>
            </li>
            <li>{`"이용자"가 해당 서비스의 환불을 요청할 경우, "이용자"가 환불에 대해 직접 "사이트"에 전화, 이메일을 통하여 알려야 합니다.`}</li>
            <li>{`"사이트"는 환불요건이 충족된 이용자에 한해서, 이용자로부터 해지 통보를 받은 경우  영업일 5일 이내에 "서비스"에 대한 대금을 환급합니다.`}</li>
            <li>{`"사이트"는 이용대금의 결제와 동일한 방법으로 결제 대금을 환불해야 하며, 동일한 방법으로 환불이 불가능할 경우 이를 사전에 고지하여야 합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 17조 [면책조항]</h3>
          <ol>
            <li>{`회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우 서비스 제공에 관한 책임이 면제됩니다.`}</li>
            <li>{`회사는 회원의 귀책사유로 인해 발생한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.`}</li>
            <li>{`회사는 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.`}</li>
            <li>{`회사는 이용자 상호간 또는 이용자와 제 3자 간 콘텐츠를 매개로 하여 발생한 분쟁 등에 대하여 책임을 지지 않습니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 18조 [개인정보보호]</h3>
          <ol>
            <li>{`"사이트"는 이용자의 개인정보 수집 시 서비스 제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.`}</li>
            <li>{`“회원”의 정보를 정정할 경우에는 개인정보 관리책임자 및 담당자에게 서면, 전화, 카톡 또는 이메일로 연락하시면 지체 없이 조치해 드리겠습니다.`}</li>
            <li>{`"사이트"는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.`}</li>
            <li>{`"사이트"는 이용자의 개인정보를 수집 · 이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.`}</li>
            <li>{`"사이트"는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제 3자에게 제공하는 경우에는 이용 · 제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.`}</li>
            <li>{`"사이트"가 제 2항과 제 3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원 (소속, 성명 및 전화번호, 기타 연락처), 정보의 수집목적 및 이용목적, 제 3자에 대한 정보제공 관련사항 (제공받은자, 제공목적 및 제공할 정보의 내용) 등 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 제 22조 제 2항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.`}</li>
            <li>{`이용자는 언제든지 "사이트"가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 "사이트"는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 "사이트"는 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.`}</li>
            <li>{`"사이트"는 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를 최소한으로 제한하여야 하며 신용카드, 은행계좌 등을 포함한 이용자의 개인정보의 분실, 도난, 유출, 동의 없는 제 3자 제공, 변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다.`}</li>
            <li>{`"사이트"또는 그로부터 개인정보를 제공받은 제 3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다10 "사이트"는 개인정보의 수집 · 이용 · 제공에 관한 동의 란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집 · 이용 · 제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집 · 이용 · 제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.`}</li>
            <li>{`만 14세 미만 아동의 경우 법정 대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용 동의를 철회할 권리를 가집니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>{`제 19조 ["사이트"의 의무]`}</h3>
          <ol>
            <li>{`"사이트"는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화 · 용역을 제공하는데 최선을 다하여야 합니다.`}</li>
            <li>{`"사이트"는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보 (신용정보 포함) 보호를 위한 보안 시스템을 갖추어야 합니다.`}</li>
            <li>{`"사이트"가 상품이나 용역에 대하여 「표시 · 광고의 공정화에 관한 법률」 제 3조 소정의 부당한 표시 · 광교행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.`}</li>
            <li>{`"사이트"는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.`}</li>
            <li>{`"사이트"는 서비스 제공과 관련하여 알게 된 회원의 정보를 본인의 승낙 없이 제 3자에게 누설 및 배포하지 않습니다. 단, 관계법령에 따른 수사상의 목적으로 관계 기관으로부터 요구를 받았거나 방송통신심의위웥회로부터 요청 등이 있는 등 법률의 규정에 따른 적법한 절차에 의한 경우에는 그렇지 않습니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 20조 [회원의 ID 및 비밀번호에 대한 의무]</h3>
          <ol>
            <li>{`제 17조의 경우를 제외한 ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.`}</li>
            <li>{`회원은 자신의 ID 및 비밀번호를 제 3자에게 이용하게 해서는 안됩니다.`}</li>
            <li>{`회원이 자신의 ID 및 비밀번호를 도난당하거나 제 3자가 사용하고 있음을 인지한 경우에는 바로 "사이트" 에 통보하고 "사이트"의 안내가 있는 경우에는 그에 따라야 합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 21조 [이용자의 의무]</h3>
          <ol>
            <li>
              <p>{`이용자는 다음 각 호에 해당하는 행위를 하여서는 안 됩니다.`}</p>
              <ul>
                <li>{`신청 또는 변경 시 허위 내용의 등록`}</li>
                <li>{`타인의 정보 도용`}</li>
                <li>{`"사이트"에 게시된 정보의 변경`}</li>
                <li>{`"사이트"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시`}</li>
                <li>{`"사이트"및 기타 제 3자의 저작권 등 지적재산권에 대한 침해`}</li>
                <li>{`"사이트"및 기타 제 3자의 명예를 손상시키거나 업무를 방해하는 행위`}</li>
                <li>{`외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 사이트에 공개 또는 게시하는 행위 또는 다른 회원이나 특정 트레이너에게 발송하는 행위`}</li>
                <li>{`다른 회원이나 특정 트레이너에게 수치심을 주거나 괴롭히는 행위`}</li>
                <li>{`회사가 제공하는 서비스 이용 방법을 따르지 않고 비정상적인 방법으로 서비스를 이용하거나 시스템에 접근하는 행위`}</li>
                <li>{`성폭력 특별법에 위배되는 행위`}</li>
              </ul>
            </li>
            <li>{`회원은 관계 법령, 본 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는 사항 등을 지켜야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.`}</li>
            <li>{`회원이 본 조 제 1항에 명시된 행위를 하였을 때 회사는 부가적으로 제공한 혜택의 일부 또는 전부의 회수, 특정 서비스의 이용 제한, 이용계약의 해지 및 손해배상의 청구 등 법적인 조치를 취할 수 있습니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>{`제 22조 ["연결 사이트"와 "피연결 사이트"간의 관계]`}</h3>
          <ol>
            <li>{`상위 "사이트"와 하위 "사이트"가 하이퍼링크(예: 하이퍼링크 대상에는 문자, 그림 및 동화상 등이 포함됨) 방식 등으로 연결된 경우, 전자를 "연결 사이트" 이라고 하고 후자를 "피연결 사이트" 라고 합니다.`}</li>
            <li>{`"연결 사이트" 는 "피연결 사이트" 가 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 "연결 사이트" 의 초기화면 또는 연결되는 시점의 팝업 화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>제 23조 [저작권의 귀속 및 이용제한]</h3>
          <ol>
            <li>{`"사이트"가 작성한 저작물에 대한 저작권 기타 지적재산권은 "사이트"에 귀속합니다. `}</li>
            <li>{`이용자는 "사이트"를 이용함으로써 얻은 정보 중 "사이트"에게 지적재산권에 귀속된 정보를 "사이트"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제 3자에게 이용하게 하여서는 안됩니다.`}</li>
            <li>{`"사이트"는 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3></h3>
          <ol>
            <li>{`"사이트"는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치 · 운영합니다.`}</li>
            <li>{`"사이트"는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리 일정을 즉시 통보합니다.`}</li>
            <li>{`"사이트"와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원해 또는 시 · 도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다. `}</li>
          </ol>
        </section>
        <section>
          <h3>제 25조 [재판권 및 준거법]</h3>
          <ol>
            <li>{`"사이트"와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 재소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다`}</li>
            <li>{`"사이트"와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.`}</li>
          </ol>
        </section>
        <section>
          <h3>부칙</h3>
          <p>이 약관은 2024년 07월 01일부터 시행합니다.</p>
        </section>
      </Layout.Contents>
    </Layout>
  );
};

export { PolicyTermsPage };
