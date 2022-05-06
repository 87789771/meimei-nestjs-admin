/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-08 17:14:57
 * @LastEditTime: 2022-05-05 16:00:15
 * @LastEditors: Please set LastEditors
 * @Description: 公共方法
 * 
 * @FilePath: \meimei-admin\src\shared\shared.service.ts
 * You can you up，no can no bb！！
 */

import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';
import { Request } from 'express'
import axios from 'axios';
import * as iconv from 'iconv-lite'


@Injectable()
export class SharedService {
    /**
     * 构造树型结构数据
     */
    public handleTree(data: any[], id?: string, parentId?: string, children?: string) {
        let config = {
            id: id || 'id',
            parentId: parentId || 'parentId',
            childrenList: children || 'children'
        };

        var childrenListMap = {};
        var nodeIds = {};
        var tree = [];

        for (let d of data) {
            let parentId = d[config.parentId];
            if (childrenListMap[parentId] == null) {
                childrenListMap[parentId] = [];
            }
            nodeIds[d[config.id]] = d;
            childrenListMap[parentId].push(d);
        }

        for (let d of data) {
            let parentId = d[config.parentId];
            if (nodeIds[parentId] == null) {
                tree.push(d);
            }
        }

        for (let t of tree) {
            adaptToChildrenList(t);
        }

        function adaptToChildrenList(o) {
            if (childrenListMap[o[config.id]] !== null) {
                o[config.childrenList] = childrenListMap[o[config.id]];
            }
            if (o[config.childrenList]) {
                for (let c of o[config.childrenList]) {
                    adaptToChildrenList(c);
                }
            }
        }
        return tree;
    }


    /* 获取请求IP */
    getReqIP(req: Request): string {
        return (
            // 判断是否有反向代理 IP
            (
                (req.headers['x-forwarded-for'] as string) ||
                // 判断后端的 socket 的 IP
                req.socket.remoteAddress ||
                ''
            ).replace('::ffff:', '')
        );
    }

    /* 判断IP是不是内网 */
    IsLAN(ip: string) {
        ip.toLowerCase();
        if (ip == 'localhost') return true;
        var a_ip = 0;
        if (ip == "") return false;
        var aNum = ip.split(".");
        if (aNum.length != 4) return false;
        a_ip += parseInt(aNum[0]) << 24;
        a_ip += parseInt(aNum[1]) << 16;
        a_ip += parseInt(aNum[2]) << 8;
        a_ip += parseInt(aNum[3]) << 0;
        a_ip = a_ip >> 16 & 0xFFFF;
        return (a_ip >> 8 == 0x7F || a_ip >> 8 == 0xA || a_ip == 0xC0A8 || (a_ip >= 0xAC10 && a_ip <= 0xAC1F));
    }

    /* 通过ip获取地理位置 */
    async getLocation(ip: string) {
        if (this.IsLAN(ip)) return '内网IP'
        let { data } = await axios.get(`http://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`, { responseType: "arraybuffer" })
        data = JSON.parse(iconv.decode(data, 'gbk'))
        return data.pro + ' ' + data.city;
    }

    /**
     * @description: AES加密
     * @param {string} msg
     * @param {string} secret
     * @return {*}
     */
    aesEncrypt(msg: string, secret: string): string {
        return CryptoJS.AES.encrypt(msg, secret).toString();
    }

    /**
     * @description: AES解密
     * @param {string} encrypted
     * @param {string} secret
     * @return {*}
     */
    aesDecrypt(encrypted: string, secret: string): string {
        return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
    }

    /**
     * @description: md5加密
     * @param {string} msg
     * @return {*}
     */
    md5(msg: string): string {
        return CryptoJS.MD5(msg).toString();
    }

    /**
     * @description: 生成一个UUID
     * @param {*}
     * @return {*}
     */
    generateUUID(): string {
        return nanoid();
    }

    /**
     * @description: 生成随机数
     * @param {number} length
     * @param {*} placeholder
     * @return {*}
     */
    generateRandomValue(length: number, placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',): string {
        const customNanoid = customAlphabet(placeholder, length);
        return customNanoid();
    }
}
